import type { ReactNode, CSSProperties, FC } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    variant?: 'elevated' | 'outlined' | 'filled';
    size?: 'sm' | 'md' | 'lg';
    shape?: 'rounded' | 'square' | 'circle';
    onClick?: () => void;
    interactive?: boolean;
}

const Card: FC<CardProps> = ({
    children,
    className = '',
    style,
    variant = 'elevated',
    size = 'md',
    shape = 'rounded',
    onClick,
    interactive = false,
}) => {
    const sizeClasses = {
        sm: 'p-2 gap-2',
        md: 'p-4 gap-4',
        lg: 'p-6 gap-6',
    };

    const variantClasses = {
        elevated: 'bg-white shadow-md hover:shadow-lg',
        outlined: 'bg-white border border-gray-200 hover:border-gray-400',
        filled: 'bg-gray-50 hover:bg-gray-100',
    };

    const shapeClasses = {
        rounded: 'rounded-lg',
        square: 'rounded-none',
        circle: 'rounded-full',
    };

    const interactiveClasses = interactive ? 'cursor-pointer transition-all' : '';

    const baseClasses = `
        flex flex-col
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${shapeClasses[shape]}
        ${interactiveClasses}
        ${className}
    `;

    return (
        <button
            className={baseClasses.trim().replace(/\s+/g, ' ')}
            onClick={onClick}
            style={style}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick?.();
                }
            }}
        >
            {children}
        </button>
    );
};

export default Card;