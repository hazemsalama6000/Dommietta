import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ITreeRoles } from '../../../models/ITreeRoles.interface';
import { Subscription } from 'rxjs';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-treepermission',
  templateUrl: './treepermission.component.html',
  styleUrls: ['./treepermission.component.scss']
})
export class TreepermissionComponent implements OnInit {
  permissionTree: ITreeRoles[];
  private unsubscribe: Subscription[] = [];

  public treeControl = new NestedTreeControl<ITreeRoles>((node: any) => node.children);
  public dataSource = new MatTreeNestedDataSource<ITreeRoles>();

  constructor(private roleService: RolesService) {
    let getTree = roleService.permissionTree.subscribe(res => {
      this.permissionTree = res
      this.dataSource.data = res;
      Object.keys(this.dataSource.data).forEach((key: any) => { this.setParent(this.dataSource.data[key]); });
    });
    this.unsubscribe.push(getTree);
  }

  ngOnInit(): void {

  }

  hasChild = (_: number, node: ITreeRoles) => !!node.children && node.children.length > 0;

  setParent(node: ITreeRoles, parent?: ITreeRoles) {
    node.parent = parent;
    if (node.children) {
      node.children.forEach((childNode) => { this.setParent(childNode, node); });
    }
    else {
      this.itemToggle(node.isSelected ?? false, node)
    }
  }

  checkAllParents(node: ITreeRoles) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.isSelected = descendants.every((child: any) => child.isSelected);
      node.parent.indeterminate = descendants.some((child: any) => child.isSelected);
      this.checkAllParents(node.parent);
    }
  }

  itemToggle(checked: boolean, node: ITreeRoles) {
    
    node.isSelected = checked;
    if (node.children) {
      node.children.forEach((child: any) => { this.itemToggle(checked, child); });
    }
    this.checkAllParents(node);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}

