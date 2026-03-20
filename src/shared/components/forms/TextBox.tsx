interface TextBoxProps {
    label: string;
    placeholder?: string;
    vatue: string;
    onChange?: (v: string) => void;
}

export default function TextBox(props: TextBoxProps){
    return (
        <div>
            <label>
                {props.label}
            </label>
            <input>
                placeholder={props.placeholder}
                value={props.vatue?? ''}
                {/* onChange={e=> props.onChange?.(e.target.value)} */}
            </input>
        </div>
    );
}