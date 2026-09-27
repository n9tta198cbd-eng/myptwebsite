/** Общие пропсы блока: сам блок, якорь, подпись «N° 02» и порядковый номер на странице. */
export type BlockProps<B> = { block: B; id: string; label: string; index: number };
