import { useParams } from "react-router";
import PasteContent from "../components/PasteContent.jsx";

const PasteView = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Viewing Paste: {id}</h1>
            <PasteContent pasteId={id} />
        </div>
    );
}

export default PasteView;