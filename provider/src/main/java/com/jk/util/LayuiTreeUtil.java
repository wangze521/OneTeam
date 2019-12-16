package com.jk.util;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LayuiTreeUtil {
    
    /**
     * 获取父节点菜单
     * @param treesList 所有树菜单集合
     * @return
     */
    public final static List<LayuiTree> getFatherNode(List<LayuiTree> treesList){
        List<LayuiTree> newTrees = new ArrayList<LayuiTree>();
        for (LayuiTree mt : treesList) {
            if (mt.getpId() ==0) {//如果pId为空，则该节点为父节点
                //递归获取父节点下的子节点
                mt.setChildren(getChildrenNode(mt.getId(), treesList));
                newTrees.add(mt);
            }
            
        }
        return newTrees;
    }
    
    /**
     * 递归获取子节点下的子节点
     * @param pId 父节点的ID
     * @param treesList 所有菜单树集合
     * @return
     */
    private final static List<LayuiTree> getChildrenNode(Long pId, List<LayuiTree> treesList){
        List<LayuiTree> newTrees = new ArrayList<LayuiTree>();
        for (LayuiTree mt : treesList) {
            if (mt.getpId()==0) continue;
            if(mt.getpId().equals(pId)){
                //递归获取子节点下的子节点，即设置树控件中的children
                mt.setChildren(getChildrenNode(mt.getId(), treesList));
                //设置树控件attributes属性的数据
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("href", mt.getHref());
                mt.setAttributes(map);
                newTrees.add(mt);
            }
        }
        return newTrees;
    }
}
