import { ColumnSection } from "./page-data";

export const lerp = (x: number, y: number, a: number): number =>
  x * (1 - a) + y * a;

export const clamp = (a: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, a));

export const invlerp = (x: number, y: number, a: number): number =>
  clamp((a - x) / (y - x));

export const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number
): number => lerp(x2, y2, invlerp(x1, y1, a));

export function parseColor(input: string): [number, number, number] {
  if (input.substr(0, 1) === "#") {
    var col_len = (input.length - 1) / 3;
    var fact = [17, 1, 0.062272][col_len - 1];
    return [
      Math.round(parseInt(input.substr(1, col_len), 16) * fact),
      Math.round(parseInt(input.substr(1 + col_len, col_len), 16) * fact),
      Math.round(parseInt(input.substr(1 + 2 * col_len, col_len), 16) * fact),
    ];
  }
  return [0, 0, 0];
}

export function calcOpacity(
  foregroundColor: string,
  backgroundColor: string,
  opacity: number
) {
  const [foregroundRed, foregroundGreen, foregroundBlue] =
    parseColor(foregroundColor);
  const [backgroundRed, backgroundGreen, backgroundBlue] =
    parseColor(backgroundColor);
  const r = Math.floor(foregroundRed * opacity + backgroundRed * (1 - opacity));
  const g = Math.floor(
    foregroundGreen * opacity + backgroundGreen * (1 - opacity)
  );
  const b = Math.floor(
    foregroundBlue * opacity + backgroundBlue * (1 - opacity)
  );

  return "#" + ((r << 16) | (g << 8) | b).toString(16);
}

export function calcBrightness(color: string): number {
  const [red, green, blue] = parseColor(color);
  return (red * 299 + green * 587 + blue * 114) / 1000;
}

export function invertColor(hex: string): string {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}

export function getCssVariable(variable: string): string {
  return getComputedStyle(document.body).getPropertyValue(variable);
}

export function calcDarkModeBackground(color: string): string {
  let backgroundColor = getCssVariable("--background-color");

  // if the background color variable cannot be resolved, use a fallback
  if (!backgroundColor || document.body.className !== "dark-mode") backgroundColor = "#12161d";

  return calcOpacity(
    color,
    backgroundColor,
    range(0, 255, 0.16, 0, calcBrightness(color))
  );
}

export const rgba2hex = (rgba: string) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    ?.slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

export function mapPreviewColumns(
  columns: any,
  getAsset: (asset: string) => {
    url: string;
    path: string;
    field?: any;
    fileObj: File;
  }
): ColumnSection["columns"][0] {
  return columns?.map(
    (column: any) =>
      ({
        ...column,
        previewImage: column.imageUrl ? getAsset(column.imageUrl).url : null,
        header:
          column.header != null
            ? {
                ...column.header,
                previewImage: column.header.imageUrl
                  ? getAsset(column.header.imageUrl).url
                  : null,
              }
            : null,
        columns: mapPreviewColumns(column.columns, getAsset),
      } as ColumnSection["columns"][0])
  );
}

export function mapPreviewImage<T extends { imageUrl?: string }>(
  objectWithImage: T,
  getAsset: (asset: string) => {
    url: string;
    path: string;
    field?: any;
    fileObj: File;
  }
): (T & { previewImage?: string }) | undefined {
  return objectWithImage
    ? {
        ...objectWithImage,
        previewImage: objectWithImage.imageUrl
          ? getAsset(objectWithImage.imageUrl).url
          : undefined,
      }
    : undefined;
}