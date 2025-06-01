"use client";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {
    return ( 
        <div>NavBar</div>
     );
}
 
export default Navbar;