import React, { useEffect, useState } from "react";
import { User } from "../../../types/user";
import {
  OrganizationChart,
  OrganizationChartNodeData,
} from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import OrganizationUnitService from "../../../services/OrganizationUnitService";
import { Panel } from "primereact";
import { classNames } from "primereact/utils";
import "./styles.css";

function OrganizationCharts(props: any) {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await OrganizationUnitService.getAllOrganizationUnits()
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.error("Error loading organization units", err);
        });
    };

    loadData();
  }, []);

  const toggleTeam = (teamName: string) => {
    setSelectedTeam((prevTeam) => (prevTeam === teamName ? null : teamName));
  };

  const nodeTemplate = (node) => {
    return (
      <div className={`node ${node.type}`}>
        {node.type === "team" ? (
          node.data.employees && node.data.employees.length > 0 ? ( // Yalnızca çalışan varsa panel toggleable olsun
            <Panel
              header={<div className="panel-header">{node.label}</div>}
              toggleable
              className="node team"
              collapsed={selectedTeam !== node.label} // Seçilen takım açık olacak
              onToggle={() => toggleTeam(node.label)} // Paneller arasında geçiş yapmak için
            >
              <div>
                {node.data.employees.map((employee) => (
                  <div
                    key={employee.id}
                    className={`employee ${employee.type}`}
                    style={{ marginBottom: "5px" }}
                  >
                    {employee.name}
                  </div>
                ))}
              </div>
            </Panel>
          ) : (
            <div className="panel-header">{node.label}</div>
          )
        ) : (
          node.type === "person" && (
            <div className="employee-node">
              <span className="font-bold">{node.label}</span>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="organizationchart-demo">
      <div className="card overflow-x-auto">
        {data && data.length > 0 ? (
          <OrganizationChart
            value={data}
            nodeTemplate={nodeTemplate}
            className="company"
          />
        ) : (
          <p>Loading...</p> // boş veri mesajı
        )}
      </div>
    </div>
  );
}
export default OrganizationCharts;