import { useDrag } from "react-dnd";

type CardProps = {
    image: string
    id: number | string
}


const Card = ({ image, id }: CardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1,}}
      src={image}
      alt="dress"
    />
  );
};

export default Card;
