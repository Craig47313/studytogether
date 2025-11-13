import useAuthStore from "../../../../market-app/src/components/store/useAuthStore";

export default function GoogleButton(props){
    const setUser = useAuthStore((state)=>state.setUser());
}