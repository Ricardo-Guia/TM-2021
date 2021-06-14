using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cleaner : MonoBehaviour
{
    // Start is called before the first frame update
    void Start() {
        
    }

    // Update is called once per frame
    void Update() {
        
    }

    void OnTriggerEnter(Collider other) {
        if(other.tag == "Player"){
            playerHealth playerDead = other.gameObject.GetComponent<playerHealth>();
            playerDead.makeDead();
        }else{
            Destroy(other.transform.root.gameObject);
        }
    }
}
