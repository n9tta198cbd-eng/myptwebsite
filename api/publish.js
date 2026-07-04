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

  const { content, password } = parsed || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Invalid content' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  const owner = 'n9tta198cbd-eng';
  const repo = 'myptwebsite';
  const path = 'content/content.json';
  const branch = 'master';

  try {
    const jsonStr = JSON.stringify(content, null, 2);

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
          message: 'Update content from admin panel',
          content: Buffer.from(jsonStr).toString('base64'),
          sha: sha || undefined,
          branch,
        }),
      }
    );

    if (!putRes.ok) {
      const err = await putRes.json();
      console.error('GitHub API error:', err);
      return res.status(500).json({ error: 'Failed to push to GitHub', details: err });
    }

    const result = await putRes.json();
    return res.status(200).json({
      success: true,
      commit: result.commit?.sha,
      message: 'Content published! Vercel will redeploy shortly.',
    });
  } catch (err) {
    console.error('Publish error:', err);
    return res.status(500).json({ error: err.message });
  }
};
