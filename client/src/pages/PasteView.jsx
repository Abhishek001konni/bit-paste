import { useParams } from "react-router";
import PasteContent from "../components/PasteContent.jsx";

const PasteView = () => {
    const { id } = useParams();

    return (
        <div>
            <PasteContent pasteId={id} />
        </div>
    );
}

export default PasteView;