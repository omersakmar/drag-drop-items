
import Card from "./Card";
import { FixedSizeGrid as Grid } from "react-window";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from "../hooks/useLocalStorage";


type BoardItem = {
  id: number | string
  imgSrc: string
}

type DragProps = {
    columnIndex: number
    rowIndex: number
    style: any
}

const pictureList: {id: number | string, imgSrc: string}[] = [
  {
  "id": uuidv4(), "imgSrc": "https://johnlewis.scene7.com/is/image/JohnLewis/005738051alt3?"
  },
  {
    "id": uuidv4(), "imgSrc": "https://johnlewis.scene7.com/is/image/JohnLewis/dress-2-010422-1"
  },
  {
    "id": uuidv4(), "imgSrc": "https://johnlewis.scene7.com/is/image/JohnLewis/005346298"
  },
  {
    "id": uuidv4(), "imgSrc": "https://johnlewis.scene7.com/is/image/JohnLewis/006076501alt1?"
  }
]

let cellWithImages = pictureList.map((picture) => (
  <Card key={picture.id} image={picture?.imgSrc} id={picture.id} />
))
let emptyCellMessage = <p>Nothing to see here.</p>

const Cell = ({ columnIndex, rowIndex, style }: DragProps) => (
  // checks if we have any elements in the pictureList array
  // if not, displays an empty message
  <div style={style}>
    {pictureList.length > 0 ? cellWithImages : emptyCellMessage}
  </div>
);



export function MainBoard() {
  // decided to save the items to localstorage
  const [boardItems, setBoardItems] = useLocalStorage<BoardItem[]>("board-items", [])

  const [ {isOver}, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: {id: number | string}) => addImageToBoard(item.id),
    // Tried using the isOver option to change the boards backgroundColor but could not get it to work for some reason
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  }));

  function addImageToBoard(id: number | string){
    // since we are not interested in multiple items
    // but rather intend on just finding one particular item
    // i switched to using find method instead of filter
    const imageToDrag = pictureList.find((picture) => id === picture.id)
    // checks if the image object really has an image source
    if (imageToDrag?.imgSrc){
    setBoardItems((board) => [...board, imageToDrag])
    }
  };

  function removeImageFromBoard(index: number){
    // mutating state directly is not approved in react
    // but i guess creating a copy of the array kind of fixes the issue
    // this way, at least the issue i had in the earlier version gets fixed
    const boardItemsCopyArray = [...boardItems]
    boardItemsCopyArray.splice(index, 1)
    setBoardItems(boardItemsCopyArray)
  }

  function removeEveryImage(): any{
    setBoardItems([])
  }


  return (
    <>
    <div className="flex">
  
        <Grid
          columnCount={1}
          columnWidth={500}
          height={500}
          rowCount={1}
          rowHeight={500}
          width={500}
        >
          {Cell}
        </Grid>
        <div className="container mx-auto"  ref={drop}>
          {boardItems.length === 0 && <p>Nothing to see here</p>}
          {boardItems.length >= 2 && <button onClick={removeEveryImage}>Remove every item</button>}
          {boardItems.map((item, index) => (
            // using index as key is not recommended, but it solves the problem of removing two elements with one click
            // when the elements share the same id
            <div key={index} className="flex justify-center">
              <Card image={item.imgSrc} id={item.id} />
              <button onClick={() => removeImageFromBoard(index)}>Remove</button>
            </div>
          ))}
        </div>

        </div>
    </>
  )
}