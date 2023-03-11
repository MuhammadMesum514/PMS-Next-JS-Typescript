"use client";
import Link from "next/link";
import { Settings,Grid,User,Calendar } from "react-feather";
import {usePathname} from "next/navigation";
import clsx from "clsx";

const icons = {Settings,Grid,User,Calendar};

const SideBarLink = ({link}) => {
    const pathname = usePathname();
    let isActive = false;
    if (pathname === link.link) {
        isActive = true;
    }
    const Icon = icons[link.icon];
    return (
        <Link href={link.link} className={clsx('flex items-center justify-center w-12 h-12 rounded-full text-white',
             pathname === link.link ? "bg-gradient-to-r from-blue-500 to-purple-500"
                 : "bg-gray-700"
            )}>
        
            
            <Icon size={24} />
        </Link>
    );
    };

export default SideBarLink;