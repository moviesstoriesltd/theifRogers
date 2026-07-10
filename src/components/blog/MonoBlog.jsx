const MonoBlog = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 hover:shadow-2xl bg-white shadow-gray-950/30 transition-all duration-300 h-full">
      <a href={data?.link} className="block h-full">
        <div className="w-full h-56.5 bg-slate-950 text-white p-6 flex flex-col justify-between">
          <span className="text-xs text-slate-400 uppercase tracking-[0.18em]">
            Public Document
          </span>
          <span className="text-4xl font-semibold text-slate-100">
            {String(data?.id).padStart(2, "0")}
          </span>
        </div>
        <div className="m-6">
          <p className="text-[10px] xs:text-[14px] font-normal text-brand-primary">
            {data?.date} / {data?.comments}
          </p>
          <p className="text-[14px] xs:text-lg font-semibold text-slate-950 mb-3">
            {data?.title}
          </p>
          <p className="text-[12px] xs:text-[14px] text-slate-600">
            {data?.summary}
          </p>
        </div>
      </a>
    </div>
  );
};

export default MonoBlog;
