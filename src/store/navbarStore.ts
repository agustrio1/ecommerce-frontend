import { create } from "zustand";

interface NavbarState {
    showSidebar: boolean;
    isDropdownOpen: boolean;
    setShowSidebar: (showSidebar: boolean) => void;
    setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}

const useNavbarStore = create<NavbarState>((set) => ({
    showSidebar: false,
    isDropdownOpen: false,
    setShowSidebar: (showSidebar) => set({ showSidebar }),
    setIsDropdownOpen: (isDropdownOpen) => set({ isDropdownOpen }),
}));

export default useNavbarStore