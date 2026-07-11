module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = '';
  await new Promise((resolve) => {
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', resolve);
  });

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { filename, dataBase64, contentType, password } = parsed || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (!filename || !dataBase64) {
    return res.status(400).json({ error: 'filename and dataBase64 are required' });
  }

  // Разрешаем только безопасное имя файла и известные расширения — без путей и переходов вверх.
  const safeName = String(filename).replace(/[^a-zA-Z0-9._-]/g, '-').replace(/^-+/, '');
  if (!/\.(png|jpe?g|webp|gif|svg)$/i.test(safeName)) {
    return res.status(400).json({ error: 'Unsupported file type' });
  }

  // Грубая проверка размера (base64 ~4/3 от байтов); держим ниже лимита тела Vercel.
  if (dataBase64.length > 6_000_000) {
    return res.status(413).json({ error: 'File too large' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  const owner = 'n9tta198cbd-eng';
  const repo = 'myptwebsite';
  const path = `images/uploads/${safeName}`;
  const branch = 'master';

  try {
    // Файл почти всегда новый (имя с меткой времени), но на всякий случай подхватываем sha.
    let sha = null;
    const getRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }

    const putRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Upload image ${safeName} from admin panel`,
          content: dataBase64,
          sha: sha || undefined,
          branch,
        }),
      }
    );

    if (!putRes.ok) {
      const err = await putRes.json();
      console.error('GitHub API error:', err);
      return res.status(500).json({ error: 'Failed to upload to GitHub', details: err });
    }

    const result = await putRes.json();
    return res.status(200).json({
      success: true,
      path,
      contentType: contentType || 'image/*',
      commit: result.commit && result.commit.sha,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message });
  }
};
