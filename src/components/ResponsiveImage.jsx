const DEFAULT_WIDTHS = [480, 960];
const RESPONSIVE_IMAGE_PATTERN = /\.jpe?g$/i;

function getVariantPath(src, width, format) {
  return src.replace(RESPONSIVE_IMAGE_PATTERN, `-${width}.${format}`);
}

function canUseResponsiveSources(src) {
  return typeof src === "string" && RESPONSIVE_IMAGE_PATTERN.test(src);
}

function createSrcSet(src, widths, format) {
  return widths
    .map((width) => `${getVariantPath(src, width, format)} ${width}w`)
    .join(", ");
}

function ResponsiveImage({
  src,
  alt,
  className = "",
  sources = [],
  widths = DEFAULT_WIDTHS,
  sizes = "100vw",
  type = "image/jpeg",
  format = "jpg",
  pictureClassName = "contents",
  ...imgProps
}) {
  const customSources = sources
    .map((source) => {
      if (source.srcSet) {
        return {
          type: source.type,
          srcSet: source.srcSet,
          sizes: source.sizes ?? sizes,
        };
      }

      const sourceSrc = source.src ?? src;

      if (!canUseResponsiveSources(sourceSrc)) return null;

      return {
        type: source.type,
        srcSet: createSrcSet(
          sourceSrc,
          source.widths ?? widths,
          source.format ?? format,
        ),
        sizes: source.sizes ?? sizes,
      };
    })
    .filter(Boolean);

  if (!canUseResponsiveSources(src) && customSources.length === 0) {
    return <img src={src} alt={alt} className={className} {...imgProps} />;
  }

  const defaultSrcSet = canUseResponsiveSources(src)
    ? createSrcSet(src, widths, format)
    : null;

  return (
    <picture className={pictureClassName}>
      {customSources.map((source) => (
        <source
          key={`${source.type ?? "source"}-${source.srcSet}`}
          type={source.type}
          srcSet={source.srcSet}
          sizes={source.sizes}
        />
      ))}
      {defaultSrcSet ? <source type={type} srcSet={defaultSrcSet} sizes={sizes} /> : null}
      <img src={src} alt={alt} className={className} {...imgProps} />
    </picture>
  );
}

export default ResponsiveImage;
