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

    // タイトルを入力した時のエラーハンドリング
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
          {/* ここから */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className=""
              onClose={closeModal}
            >
            <div className="min-h-screen px-4 text-center boder-2">
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform border border-gray-300 shadow-xl bg-gray-50 rounded-xl">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-center text-gray-900"
                    >
                      Add Title
                    </Dialog.Title>
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        <div className="col-span-1 text-xl text-center">Title</div>
                        <input 
                          className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                          value={title}
                          onChange={(e) => {
                            return setTitle(e.target.value);
                          }}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      <div className="col-span-1 text-xl text-center">Author</div>
                      <input 
                        className="w-full h-10 col-span-3 p-2 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
                        value={author}
                        onChange={(e) => {
                            return setAuthor(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                        {/* ここからボタン */}
                    </div>
                  </div>
                </Transition.Child>
            </div>
            </Dialog>
          </Transition>
        </>
    );
}
