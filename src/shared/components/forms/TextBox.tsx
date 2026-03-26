interface TextBoxProps {
    label: string;
    placeholder?: string;
    value: string;
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
                value={props.value?? ''}
                <div onClick={(e) => console.log(e)}>Click me</div>
            </input>
        </div>
    );
}