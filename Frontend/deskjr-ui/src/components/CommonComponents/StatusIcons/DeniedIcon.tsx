import React from 'react';

interface IconProps {
    width?: number;
    height?: number;
    fill?: string;
    title?: string;
}

const DeniedIcon: React.FC<IconProps> = ({ width = 16, height = 16, fill = 'currentColor', title }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        className="bi bi-dash-circle"
        viewBox="0 0 16 16"
    >
        {title && <title>{title}</title>}
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    </svg>
);

export default DeniedIcon;