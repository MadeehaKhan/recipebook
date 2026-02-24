import { ReactNode } from 'react'

interface BlockProps {
  colour: string;
  children: ReactNode;
  className?: string;
}

export const Block = (props: BlockProps) => {
  const RADIUS = 20;
  const { colour, children, className } = props;
  return (
    <div
      className={className}
      style={{
        backgroundColor: colour,
        borderRadius: RADIUS,
        padding: 20,
        margin: 20,
      }}
    >
      {children}
    </div>
  );
};
