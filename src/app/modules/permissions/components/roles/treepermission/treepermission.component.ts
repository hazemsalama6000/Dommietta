import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-treepermission',
  templateUrl: './treepermission.component.html',
  styleUrls: ['./treepermission.component.scss']
})
export class TreepermissionComponent implements OnInit {

  public treeControl = new NestedTreeControl<permissionNode>((node:any) => node.children);
  public dataSource = new MatTreeNestedDataSource<permissionNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
    Object.keys(this.dataSource.data).forEach((key: any) => { this.setParent(this.dataSource.data[key]); });
  }
  
  ngOnInit(): void {
  }

  hasChild = (_: number, node: permissionNode) => !!node.children && node.children.length > 0;

  setParent(node: permissionNode, parent?: permissionNode) {
    node.parent = parent;
    if (node.children) {
      node.children.forEach((childNode) => { this.setParent(childNode, node); });
    }
    else {
      this.itemToggle(node.isSelected ?? false, node)
    }
  }

  checkAllParents(node: permissionNode) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.isSelected = descendants.every((child:any) => child.isSelected);
      node.parent.indeterminate = descendants.some((child:any) => child.isSelected);
      this.checkAllParents(node.parent);
    }
  }

  itemToggle(checked: boolean, node: permissionNode) {
    node.isSelected = checked;
    if (node.children) {
      node.children.forEach((child) => { this.itemToggle(checked, child); });
    }
    this.checkAllParents(node);
  }

  submit() {
console.log(TREE_DATA)
  }


}

class permissionNode {
  parent?: permissionNode;
  name: string;
  id?: number;
  children?: permissionNode[];
  isSelected?: boolean = true;
  indeterminate?: boolean;
}

const TREE_DATA: permissionNode[] = [
  {
    name: 'hr',

    children: [
      {
        name: 'job',
        children: [
          { name: 'Add', id: 1, isSelected: true },
          { name: 'Update', id: 2, isSelected: false },
          { name: 'Delete', id: 3, isSelected: true },
        ],
      },
      {
        name: 'department',
        children: [
          { name: 'Add', id: 1, isSelected: true },
          { name: 'Update', id: 2, isSelected: true },
          { name: 'Delete', id: 3, isSelected: true },
        ],
      },
    ],
  }, {
    name: 'Companies',
    children: [
      {
        name: 'Company',
        children: [
          { name: 'Add', id: 1, isSelected: true },
          { name: 'Update', id: 2, isSelected: true },
          { name: 'Delete', id: 3, isSelected: true },
        ],
      },
      {
        name: 'Branch',
        children: [
          { name: 'Add', id: 1, isSelected: true },
          { name: 'Update', id: 2, isSelected: true },
          { name: 'Delete', id: 3, isSelected: true },
        ],
      },
    ],
  }
];
