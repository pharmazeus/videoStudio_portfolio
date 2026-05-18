const DEFAULT_WIDTHS = [480, 960];
const RESPONSIVE_IMAGE_PATTERN = /\.jpe?g$/i;

function getVariantPath(src, width, format) {
  return src.replace(RESPONSIVE_IMAGE_PATTERN, `-${width}.${format}`);
}

function canUseResponsiveSources(src) {
  return typeof src === "string" && RESPONSIVE_IMAGE_PATTERN.test(src);
}

function ResponsiveImage({
  src,
  alt,
  className = "",
  widths = DEFAULT_WIDTHS,
  sizes = "100vw",
  type = "image/jpeg",
  format = "jpg",
  pictureClassName = "contents",
  ...imgProps
}) {
  if (!canUseResponsiveSources(src)) {
    return <img src={src} alt={alt} className={className} {...imgProps} />;
  }

  const srcSet = widths
    .map((width) => `${getVariantPath(src, width, format)} ${width}w`)
    .join(", ");

  return (
    <picture className={pictureClassName}>
      <source type={type} srcSet={srcSet} sizes={sizes} />
      <img src={src} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}

export default ResponsiveImage;
