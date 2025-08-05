import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { sendError } from "@/lib/utils";
import axios from "../lib/axios";

function BarCode() {
  const inputRef = useRef(null);

  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const keepFocus = () => inputEl.focus();
    inputEl.addEventListener("blur", keepFocus);
    inputEl.focus();

    const handleKeyPress = async (e) => {
      if (e.key === "Enter") {
        const studentCode = inputEl.value.trim();
        if (studentCode) {
          await axios
            .post(`/students/${studentCode}`)
            .then((res) => {
              toast.success(`تم تسجيل الحضور ل${res.data.name} بنجاح`, {
                description: `كود الطالب/ـة: ${res.data.code}`,
              });
            })
            .catch((err) => {
              sendError(err.response.data.message);
            });

          inputEl.value = "";
        }
      }
    };

    inputEl.addEventListener("keypress", handleKeyPress);

    return () => {
      inputEl.removeEventListener("blur", keepFocus);
      inputEl.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-200px)]">
        <QrCode size={230} strokeWidth={1} />
        <p className="text-muted-foreground text-sm">
          قم بمسح الباركود الخاص بالطالب او قم بكتابة الكود الذي يمتلكه الطالب
          لكي يتم تسجيل حضور الطالب في هذا اليوم.
        </p>
        <Input
          ref={inputRef}
          type="text"
          className="w-[200px]"
          placeholder="ادخل الكود الخاص بالطالب"
        />
      </main>
    </>
  );
}

export default BarCode;
