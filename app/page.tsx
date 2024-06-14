import PickList from '@com/pickList'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <PickList title="What are you going to do today?"></PickList>
    </main>
  );
}
