import Image from "next/image";
import add from "public/add.png";
import { client } from "../libs/supabase";
import { Dialog, Transition } from "@headlessui/react";
import { Button, IconPlus, IconX } from "@supabase/ui";
import { Fragment, useCallback, useState } from "react";

type Props = {
    uuid: string;
    getTitleList: VoidFunction;
};

export const AddTitle = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setTitle("");
        setAuthor("");
        setIsOpen(false);
    }, []);

    // ここから
    const handleAdd = useCallback (
        async (uuid: string) => {
            if(title == "") {
                alert("Input Title.");
                return;
            }
            const { data, error } = await client
                .from("manga_title")
                .insert([{ user_id: uuid, title: title, author: author }]);
            if (error) {
                alert("Failed: Add Title.");
            } else {
                if (data) {
                    props.getTitleList();
                    closeModal();
                }
            }
        },
        [title, author, props, closeModal]
    );
    return (
        <>
          <div className="p-2 border cursor-pointer" onClick={openModal}>
            <div className="flex justify-center">
                <Image src={add} alt="thumbnail" width={126} height={200} />
            </div>
            <div className="mt-2 text-center">Add New</div>
          </div>

          <Transition>

          </Transition>
        </>
    );
}
