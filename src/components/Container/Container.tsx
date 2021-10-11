export interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`container px-4 sm:px-5 lg:px-6 xl:px-8 mx-auto ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
