import type {Cat, ProcessState} from "../../entities/cat/model/types.ts";
import Skeleton from "../ui/Skeleton/Skeleton.tsx";
import Spinner from "../ui/Spinner/Spinner.tsx";
import ErrorMessage from "../ui/ErrorMessage/ErrorMessage.tsx";
import CatGrid from "../../entities/cat/ui/CatGrid/CatGrid.tsx";

interface setContentProps {
    process: ProcessState;
    Component?: "grid";
    cats?: Cat[];
    favouriteIds?: string[];
    onToggleFavourite?: (cat: Cat) => void;
    onOpenCatPage?: (cat: Cat) => void;
}

const setContent = ({ process, Component, cats = [], onToggleFavourite, favouriteIds = [], onOpenCatPage}: setContentProps) => {
    switch (process) {
        case "waiting":
        case "loading":
            if (cats.length > 0 && Component === "grid") {
                return (
                    <CatGrid
                        cats={cats}
                        favouriteIds={favouriteIds}
                        onToggleFavourite={onToggleFavourite}
                        onOpenCatPage={onOpenCatPage}
                    />
                );
            }
            return <Spinner />;
        case 'confirmed':
            if (Component === "grid") {
                return (
                    <CatGrid
                        cats={cats}
                        favouriteIds={favouriteIds}
                        onToggleFavourite={onToggleFavourite}
                        onOpenCatPage={onOpenCatPage}
                    />
                );
            }
            return null;
        case 'error':
            return <ErrorMessage />
        default:
            return <Skeleton />;
    }
}

export default setContent;