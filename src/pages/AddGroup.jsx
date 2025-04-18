import { toast } from "sonner";
import React, { useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "../components/ButtonLoading";
import { sendError } from "../lib/utils";
import GroupsButton from "../components/GroupsButton";

function AddGroup() {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const createGroup = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post("/groups", {
          title,
        });
        toast.success("تم إضافة المجموعة بنجاح.");
        navigate("/");
      } catch (err) {
        sendError(err.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="flex gap-2 absolute left-5 top-5">
        <GroupsButton />
      </div>
      <main className="w-full h-[calc(100vh-150px)] flex justify-center items-center">
        <section className="grid items-center gap-8 pb-8 pt-6 md:py-8 container max-w-lg">
          <div className="rounded-lg border border-dark bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col p-6 space-y-1 text-center">
              <h3 className="font-bold tracking-tight text-2xl">
                إضافة مجموعة
              </h3>
            </div>
            <div className="p-6 pt-0 grid gap-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-dark" />
                </div>
              </div>
              <form
                className="grid gap-4"
                autoComplete="off"
                onSubmit={(e) => createGroup.mutate(e)}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    إسم المجموعة
                  </label>
                  <Input
                    type="text"
                    placeholder="مجموعة سبت و ثلاثاء الساعة 1"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    maxLength={70}
                  />
                </div>
                {createGroup.isPending ? (
                  <ButtonLoading />
                ) : (
                  <Button>إضافة</Button>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default React.memo(AddGroup);
