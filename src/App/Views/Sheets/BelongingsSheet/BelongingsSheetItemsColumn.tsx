import * as React from "react"
import { Textfit } from "react-textfit"
import { fmap } from "../../../../Data/Functor"
import { flength, List, map, replicateR, toArray } from "../../../../Data/List"
import { bindF, ensure } from "../../../../Data/Maybe"
import { gt } from "../../../../Data/Num"
import { Record } from "../../../../Data/Record"
import { ItemForView } from "../../../Models/View/ItemForView"
import { StaticDataRecord } from "../../../Models/Wiki/WikiModel"
import { localizeNumber, localizeWeight, translate } from "../../../Utilities/I18n"
import { pipe, pipe_ } from "../../../Utilities/pipe"
import { renderMaybe, renderMaybeWith } from "../../../Utilities/ReactUtils"

interface Props {
  columnSize: number
  items: List<Record<ItemForView>>
  staticData: StaticDataRecord
}

const IFVA = ItemForView.A

export const BelongingsSheetItemsColumn: React.FC<Props> = props => {
  const { columnSize, staticData, items } = props

  return (
    <table>
      <thead>
        <tr>
          <th className="name">
            {translate (staticData) ("sheets.belongingssheet.equipmenttable.labels.item")}
          </th>
          <th className="amount">
            {translate (staticData) ("sheets.belongingssheet.equipmenttable.labels.number")}
          </th>
          <th className="price">
            {translate (staticData) ("sheets.belongingssheet.equipmenttable.labels.price")}
          </th>
          <th className="weight">
            {translate (staticData) ("sheets.belongingssheet.equipmenttable.labels.weight")}
          </th>
          <th className="where">
            {translate (staticData) ("sheets.belongingssheet.equipmenttable.labels.carriedwhere")}
          </th>
        </tr>
      </thead>
      <tbody>
        {pipe_ (
          items,
          map (e => (
            <tr key={IFVA.id (e)}>
              <td className="name">
                <Textfit max={11} min={7} mode="single">{IFVA.name (e)}</Textfit>
              </td>
              <td className="amount">{renderMaybe (ensure (gt (1)) (IFVA.amount (e)))}</td>
              <td className="price">
                {pipe_ (
                  e,
                  IFVA.price,
                  bindF (ensure (gt (0))),
                  renderMaybeWith (localizeNumber (staticData))
                )}
              </td>
              <td className="weight">
                  {pipe_ (
                    e,
                    IFVA.weight,
                    fmap (pipe (
                      localizeWeight (staticData),
                      localizeNumber (staticData)
                    )),
                    renderMaybe
                  )}
              </td>
              <td className="where">
                <Textfit max={11} min={7} mode="single">
                  {renderMaybe (IFVA.where (e))}
                </Textfit>
              </td>
            </tr>
          )),
          toArray
        )}
        {replicateR (columnSize - flength (items))
                    (index => (
                      <tr key={`undefined-${index}`}>
                        <td className="name" />
                        <td className="amount" />
                        <td className="price" />
                        <td className="weight" />
                        <td className="where" />
                      </tr>
                    ))}
      </tbody>
    </table>
  )
}
