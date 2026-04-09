import type { JSX } from "react";

import type {ProcessState} from "../../entities/cat/model/types.ts";
import Skeleton from "../ui/Skeleton/Skeleton.tsx";
import Spinner from "../ui/Spinner/Spinner.tsx";
import ErrorMessage from "../ui/ErrorMessage/ErrorMessage.tsx";

interface setContentProps {
    process: ProcessState;
    component: JSX.Element;
}

const setContent = ({ process, component }: setContentProps): JSX.Element => {
    switch (process) {
        case "waiting":
            return <Skeleton />
        case 'loading':
            return <Spinner />
        case 'confirmed':
            return component
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error(`Процесса с таким именем: ${process} - не существует`)
    }
}

export default setContent;