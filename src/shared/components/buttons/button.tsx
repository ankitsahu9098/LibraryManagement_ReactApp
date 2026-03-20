interface ButtonProps {
  caption: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  actions?: {
    caption: string;
    onClick: () => void;
  }[];
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none"
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.caption}
    </button>
  );
}
