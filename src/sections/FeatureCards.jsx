import { abilities } from "../constants";

function FeatureCards() {
  return (
    <div className="padding-x-lg w-full">
      <div className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, desc, title }) => (
          <div
            key={title}
            className="card-border rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="size-14 flex items-center justify-center rounded-full">
              <img src={imgPath} alt={title} />
            </div>
            <h3 className="text-white font-semibold text-2xl mt-2">{title}</h3>
            <p className="text-white-50 text-lg">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCards;
