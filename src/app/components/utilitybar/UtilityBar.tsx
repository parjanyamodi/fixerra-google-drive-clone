"use client";
import Image from "next/image";
import Logo from "@/app/assets/google-drive-logo.jpeg";
import { Search, SlidersHorizontal } from "lucide-react";
import Settings from "./settings/Settings";
import { useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setSearchedAndSorted } from "@/app/redux/slices/searchedAndSortedSlice";
import { useEffect, useRef } from "react";
import { flattenFiles } from "@/app/utils/searchAndFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function UtilityBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawFileTree = useAppSelector((state) => state.rawFileTree);
  const dispatch = useDispatch();
  const handleSearchAndFilter = () => {
    let searchResults: FileDetails[] = flattenFiles(rawFileTree as FileTree);
    dispatch(setSearchedAndSorted(searchResults));
  };
  const nameInputRef =
    useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
  const handleNameFilter = () => {
    let searchResults: FileDetails[] = flattenFiles(rawFileTree as FileTree);
    if (
      !nameInputRef.current?.value ||
      nameInputRef.current?.value === "" ||
      nameInputRef.current?.value === " " ||
      nameInputRef.current?.value.length < 3
    ) {
      dispatch(setSearchedAndSorted(searchResults));
      return;
    }
    if (pathname !== "/")
      router.push("/?search=" + nameInputRef.current?.value);
    dispatch(
      setSearchedAndSorted(
        searchResults.filter((file) => {
          const searchValueRegex = new RegExp(
            nameInputRef.current?.value as string,
            "gi"
          );
          return searchValueRegex.test(file.name);
        })
      )
    );
  };
  useEffect(() => {
    if (nameInputRef.current)
      nameInputRef.current.value = searchParams.get("search") as string;
  }, [searchParams.get("search")]);
  useEffect(() => {
    handleSearchAndFilter();
  }, [rawFileTree]);
  return (
    <div className="flex flex-row items-center w-full h-[60px] gap-4">
      <div className="flex flex-row items-center gap-1 w-72">
        <Image
          src={Logo}
          alt="Logo"
          width={60}
          height={60}
          className="mix-blend-darken"
        />
        <p className="text-xl text-gray-600 font-medium ">Drive</p>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-row gap-0 px-2 bg-slate-200 rounded-full items-center justify-between w-full">
          <input
            className="flex flex-row  py-4 px-4 bg-transparent border-none outline-none placeholder:text-current text-sm w-full "
            placeholder="Search in Drive"
            onChange={handleNameFilter}
            ref={nameInputRef}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Settings />
      </div>
    </div>
  );
}
