import "./HorizontalDivider.css";

interface HorizontalDividerProps {
  text: string;
}

const HorizontalDivider = ({ text }: HorizontalDividerProps) => {
  return (
    <div className="horizontal-divider">
      <p className="horizontal-divider-line" />
      <p className="horizontal-divider-text">{text}</p>
      <p className="horizontal-divider-line" />
    </div>
  );
};

export default HorizontalDivider;
