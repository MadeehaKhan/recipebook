import { TableContents } from "./pages/TableContents";

interface BookProps {
  // Define any props you want to pass to the Book component here
}

export const Book = (props: BookProps) => {
  const config = {
    width: 300,
    height: 500,
    showCover: true,
    className: "demoBook",
    style: {},
    startPage: 0,
    size: "fixed" as const,
    minWidth: 0,
    maxWidth: 0,
    minHeight: 0,
    maxHeight: 0,
    drawShadow: false,
    flippingTime: 0,
    usePortrait: false,
    startZIndex: 0,
    autoSize: false,
    maxShadowOpacity: 0,
    mobileScrollSupport: false,
    clickEventForward: false,
    useMouseEvents: false,
    swipeDistance: 0,
    showPageCorners: false,
    disableFlipByClick: false,
  };
  return (
    <div className="grid grid-cols-2">
      <TableContents />
    </div>
  );
};
