import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "../lib/axios";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import Loader from "../components/Loader";
import PrintStudentMarks from "../components/PrintStudentMarks";
import LineChart from "../components/charts/LineChart";
import RadialChart from "../components/charts/RadialChart";
import GroupsButton from "../components/GroupsButton";
import { sendError } from "../lib/utils";

function StudentMarks({ studentId }) {
  const currentStudentId =
    studentId || location.href.split("/")[location.href.split("/").length - 2];

  const [markId, setMarkId] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: student,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["students", currentStudentId],
    queryFn: () =>
      axios
        .get(`/students/${currentStudentId}`)
        .then((res) => res.data)
        .catch((err) => {
          sendError(err.response.data.message);
        }),
  });

  const deleteMark = useMutation({
    mutationFn: () =>
      axios
        .delete(`/marks/${markId}`, {
          data: {
            password,
          },
        })
        .then(() => {
          toast.success("تم حذف درجة الطالب بنجاح.");
          refetch();
          setPassword("");
        })
        .catch((err) => {
          sendError(err.response.data.message);
        }),
  });

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex gap-2 absolute left-5 top-5">
        <GroupsButton />
      </div>
      {isLoading && <Loader className="mt-80" />}
      {student && (
        <main className="max-w-screen-xl mx-auto px-4 md:px-8 mb-5 print-none">
          <h3 className="print-show text-center font-bold hidden">
            درجات الطالب {student && student.name}
          </h3>
          <div className="justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-xl font-bold sm:text-2xl">
                درجات الطالب {student && student.name}
              </h3>
              <p className="my-2 text-muted-foreground">
                جميع درجات الطالب {student && student.name} فى الإمتحانات فى
                جميع الشهور و الأسابيع السابقة على مخطط بياني.
              </p>

              <Button
                variant="secondary"
                onClick={handlePrint}
                disabled={student.marks.length === 0}
              >
                طباعة درجات الطالب
              </Button>
            </div>
            <div className="mt-3 md:mt-0">
              <Link to={`/students/${currentStudentId}/marks/new`}>
                <Button className="inline-block px-4 py-2 duration-150 font-semibold rounded-lg md:text-sm">
                  إضافة درجة
                </Button>
              </Link>
            </div>
          </div>
          {student && (
            <>
              <div className="flex flex-col lg:flex-row w-full gap-3 my-5">
                <RadialChart marks={student.marks} />
                <LineChart marks={student.marks} />
              </div>
              <section className="flex flex-col gap-3 relative marks mt-5">
                <Dialog>
                  <main className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 flex-wrap">
                    {student.marks.map((mark, idx) => {
                      return (
                        <section
                          className="border relative m-auto w-full h-[180px] p-5 flex flex-col justify-between items-center rounded-lg"
                          key={mark._id}
                        >
                          <div className="w-10 h-10 border flex items-center justify-center absolute -top-3 -right-3 rounded-full bg-background">
                            {idx + 1}
                          </div>
                          <p className="text-muted-foreground">
                            {dayjs(mark.date).format("dddd D MMMM YYYY")}
                          </p>
                          <span className="hidden print-show">-</span>
                          <p>
                            {mark.studentMark} / {mark.maxMark}
                          </p>
                          <div className="flex gap-2">
                            <Link
                              to={`/students/${currentStudentId}/marks/${mark._id}`}
                            >
                              <Button variant="secondary">تعديل</Button>
                            </Link>
                            <DialogTrigger>
                              <Button
                                variant="destructive"
                                onClick={() => setMarkId(mark._id)}
                              >
                                حذف
                              </Button>
                            </DialogTrigger>
                          </div>
                        </section>
                      );
                    })}
                  </main>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>حذف درجة الطالب</DialogTitle>
                      <DialogDescription>
                        سيؤدى هذا القرار الى حذف درجة الإمتحان لدى الطالب للأبد.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        كلمة المرور
                      </label>
                      <Input
                        type="password"
                        placeholder="************"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        maxLength={50}
                      />
                    </div>
                    <DialogClose>
                      <Button
                        className="w-full"
                        onClick={() => deleteMark.mutate()}
                      >
                        تأكيد
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </section>
            </>
          )}
        </main>
      )}
      {student && (
        <section ref={componentRef}>
          <PrintStudentMarks student={student} />
        </section>
      )}
    </>
  );
}

export default React.memo(StudentMarks);
