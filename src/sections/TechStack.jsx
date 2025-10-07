import { TechIcon } from "../components/Models/TechLogos/TechIcon";
import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";

function TechStack() {
  return (
    <div id="skills" className="section-padding flex-center">
      <div className="w-full h-full px-5 md:px-10">
        <TitleHeader
          title="My Preffered Tech Stack"
          sub="What The Skills i Bring to the Table?"
        />
        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="tech-card card-border overflow-hidden group xl:rounded-full rounded-lg"
            >
              {/* <div className="tech-card-animated-bg" /> */}
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={icon} />
                </div>
                <div className="padding-x w-full">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;
