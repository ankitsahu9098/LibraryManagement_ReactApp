import Form from "../components/Form";
import { useNewStateMutation } from "../queries";

export default function Create() {

    const { mutateAsync } = useNewStateMutation();
    return (
      <Form
      submitCaption="Create"
      onSubmit={async state => {
        await mutateAsync(state);
      }}
      />
    );
}