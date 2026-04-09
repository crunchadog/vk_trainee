import {useAppDispatch, useAppSelector} from "../../shared/lib/hooks.ts";
import {useEffect, useRef} from "react";
import {fetchCats} from "../../entities/cat/model/catSlice.ts";
import CatGrid from "../../entities/cat/ui/CatGrid/CatGrid.tsx";
import setContent from "../../shared/lib/setContent.tsx";


const AllCatsPage = () => {
    const dispatch = useAppDispatch();
    const {cats, process} = useAppSelector(state => state.cats);
    const initialized = useRef(false);


    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            dispatch(fetchCats(1))
        }

    }, []);

    return setContent({process, component: <CatGrid cats={cats}/>})
};

export default AllCatsPage;