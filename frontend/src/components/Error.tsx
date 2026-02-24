
interface ErrorProps {
    message?: string;
}

export const Error = (props: ErrorProps) => {
    const { message } = props;
    return <div>{message || "Something went wrong..."}</div>;
}