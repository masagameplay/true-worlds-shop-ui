import React from "react";

interface RowItemProps {
    title: string;
    value: any;
}

const RowItem: React.FC<RowItemProps> = props => {

    const {title, value} = props;

    return value && <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-300">
            {title}
        </dt>
        <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2 font-bold">
            {value}
        </dd>
    </div>
}

export default RowItem;
