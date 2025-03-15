import QuickActionButton from "../../components/QuickActionButton";

export default function QuickActions({ setModelOpen }) {
  return (
    <div className="quick-actions self-start flex flex-col gap-4">
      <h2 className="text-2xl font-semibold ">Quick Actions</h2>
      <div className="flex gap-4">
        <QuickActionButton
          text="Add Note"
          onClick={() => setModelOpen("notes")}
        />
        <QuickActionButton
          text="Add Category"
          onClick={() => setModelOpen("categories")}
        />
      </div>
    </div>
  );
}
