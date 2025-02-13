function PaymentReceipts() {
  return (
    <main className="grid gap-2 grid-cols-2 grid-rows-3 mx-5">
      {new Array(10).fill(0).map((_, idx) => (
        <div
          className="hidden print-show bg-muted border border-5 border-black rounded relative"
          key={idx}
        >
          <div className="text-5xl font-semibold text-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
            عبـــد العـــــال
          </div>
          <div className="flex items-end justify-between p-3">
            <p className="font-bold text-lg">
              الاسم:{" "}
              <span className="font-normal">
                ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
              </span>
            </p>
          </div>
          <div className="flex items-end justify-between p-3">
            <p className="font-bold text-lg">
              الشهر:{" "}
              <span className="font-normal">
                ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
              </span>
            </p>
          </div>
          <div className="flex items-end justify-between p-3">
            <p className="font-bold text-lg">
              المجموعة:{" "}
              <span className="font-normal">
                ـــــــــــــــــــــــــــــــــــــــــــــــــــــــ
              </span>
            </p>
          </div>
          <div className="flex items-end justify-between p-3">
            <p className="font-bold text-lg">
              ملاحظات:{" "}
              <span className="font-normal">
                ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
              </span>
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default PaymentReceipts;
