import { useActionState } from "react";

export function NewOpinion() {

  function handleSignup(prevState,formData) {
        const title = formData.get('title');
        const body = formData.get('body');
        const userName = formData.get('userName');

        let errors =  [];
        if(title.trim().length<3){
          errors.push('Please enter a Valid Title')
        }

        if(body.trim().length<10 && body.trim().length>300){
          errors.push("Opinion must be between 10 and 300 characters")
        }

        if(!userName.trim()){
          errors.push('Provide an UserName');
        }
        if(errors.length>0){
          return {errors,enteredValues: {
           title,body,userName
          }}
        }

        return {errors:null}

  }

  const [formState ,formAction] = useActionState(handleSignup,{errors:null})
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            defaultValue={formState.enteredValues?.body}
            rows={5}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
