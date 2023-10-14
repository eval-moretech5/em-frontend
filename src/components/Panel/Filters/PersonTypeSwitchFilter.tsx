import React from "react";
import {Filters, FilterType, PanelFilterValueType, PersonFilterType} from "components/Panel/types";
import PanelSelect from "components/Panel/Filters/PanelSelect";
import {MdOutlinePermIdentity, MdWorkspacePremium} from "react-icons/md";
import {GrOrganization} from "react-icons/gr";
import {LuCrown} from "react-icons/lu";

interface PersonTypeSwitchFilterProps {
    filters: Filters;
    setFilter: (type: FilterType, value: PanelFilterValueType) => void;
}

export const PersonTypeSwitchFilter = (props: PersonTypeSwitchFilterProps) => (
    <PanelSelect
        values={[props.filters.personType]}
        changeValue={(key: PersonFilterType) => props.setFilter("personType", key) }
        items={[
            { key: "PHYSICAL" as PersonFilterType,  icon: <MdOutlinePermIdentity />, label: "Физическое лицо" },
            { key: "LEGAL" as PersonFilterType,     icon: <GrOrganization />, label: "Юридическое лицо" },
            { key: "PREMIUM" as PersonFilterType,   icon: <MdWorkspacePremium />, label: "Премиальное обслуживание" },
            { key: "PRIVILEGE" as PersonFilterType, icon: <LuCrown />, label: "Пакет \"Привилегия\"" },
        ]}
        width="190px"
    />
);