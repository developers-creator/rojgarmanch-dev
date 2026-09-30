/** रमाइलो संसार */
import { LeadListColumn } from "./LeadListColumn";

export function RamailoSansar() {
  return (
    <LeadListColumn
      id="ramailo-sansar"
      title="रमाइलो संसार"
      href="/category/ramailo-sansar"
      metaByline="सुजन श्रेष्ठ"
      leadTitle="किताबबाट नसिकिने करियरका दस सुझाव"
      image="1485846234645-a62644f84728"
      items={[
        ["सामाजिक प्रमाणको प्रभावलाई कम नआँक्नुहोस्", "मीना अधिकारी"],
        ["स्टार्टअपका आठ प्रारम्भिक समस्या र समाधान", "राजेश थापा"],
        ["अर्को भर्ना चक्रमा महत्व राख्ने विचारहरू", "अनिता गुरुङ"],
      ]}
    />
  );
}
