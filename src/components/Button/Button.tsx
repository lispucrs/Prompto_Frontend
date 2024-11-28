import { Tooltip } from "@mui/material";
import "./Button.scss";

interface ButtonProps {
  type?: "secondary" | "tertiary" | "warning" | "icon" | "primary";
  tooltip?: string;
  tooltipOffset?: number;
  width?: string;
  size?: "small" | "large";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "secondary",
  tooltip,
  tooltipOffset,
  width,
  size = "small",
  disabled = false,
  onClick,
  children,
}) => {
  const offset = tooltipOffset || 0; 

  if (disabled) {
    tooltip = "";
  }

  const buttonClasses = [
    "button",
    type,
    size,
    disabled ? "disabled" : "",
    width ? `width-${width}` : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tooltip
      title={tooltip}
      placement="top"
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, offset],
            },
          },
        ],
      }}
    >
      
      <button
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </Tooltip>
    
  );
  console.log(buttonClasses); 

};

export default Button;
