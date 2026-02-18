import type { Module, Action } from "../types/role";
import { ACTIONS } from "../constants/modules";

type Props = {
  module: Module;
  access: Action[];
  onChange: (module: Module, action: Action) => void;
  onSelectAll: (module: Module, checked: boolean) => void;
};

function ModuleCard({ module, access, onChange, onSelectAll }: Props) {

  const allSelected = ACTIONS.every(action => access.includes(action));

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">

        {/* Module Title */}
        <h5 className="card-title mb-3">{module}</h5>

        {/* ✅ Select All */}
        <div className="form-check mb-2">

          <input
            type="checkbox"
            className="form-check-input"
            id={`${module}-all`}
            checked={allSelected}
            onChange={(e) => onSelectAll(module, e.target.checked)}
          />

          <label
            className="form-check-label fw-semibold"
            htmlFor={`${module}-all`}
          >
            Select All
          </label>

        </div>

        <hr />

        {/* ✅ Vertical Actions */}
        <div className="d-flex flex-column gap-2">

          {ACTIONS.map(action => (

            <div key={action} className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                id={`${module}-${action}`}
                checked={access.includes(action)}
                onChange={() => onChange(module, action)}
              />

              <label
                className="form-check-label"
                htmlFor={`${module}-${action}`}
              >
                {action}
              </label>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default ModuleCard;
