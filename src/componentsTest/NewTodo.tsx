import { FC, FormEvent, useRef } from "react";
import { Form, Button } from 'react-bootstrap';

const NewTodo: FC<{ onAddTodo: (text: string) => void }> = ({onAddTodo}) => {
    const textRef = useRef<HTMLInputElement>(null)
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value = textRef.current!.value;
        console.log(value);
    }
    return (
        <Form onSubmit={onSubmit} className="d-flex align-items-end mb-3">
            <Form.Group>
                <Form.Label>Upload Video</Form.Label>
                <Form.Control type="file" ref={textRef} />
            </Form.Group>
            <Button 
                variant="primary" 
                type="submit"
                className="ms-2"
            >Upload</Button>
        </Form>
    )
}

export default NewTodo;