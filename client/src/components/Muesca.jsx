import { Link } from "react-router-dom"


export const Muesca = ({color="703A31"}) => {

    return (
        <div className="absolute top-[0%] right-100 h-[100px] w-[100px]">
            <svg width="100" height="100" viewBox="70 0 136 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="-2" width="195.161" height="195.869" rx="7" transform="rotate(45 0.5 -2)" fill={"#"+color} />
            </svg>  
            <Link to={-1}>
                <svg className="absolute top-[40%] ml-[7px]" width="20" height="20" viewBox="0 0 70 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M65.6514 37.4414H3.5022" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30.495 4L3.5 37.4417L30.495 70.8834" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    )

}