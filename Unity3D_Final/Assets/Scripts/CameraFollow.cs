using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour {

    public Transform target;
    public float smoothing = 5f;

    Vector3 offset;

    // Start is called before the first frame update
    void Start(){

        offset = transform.position ;
        // offset = transform.position - target.position;

     
    }

    void FixedUpdate() {
        if(target != null){
        Vector3 targetCamPos = target.position + offset;
        
        transform.position = Vector3.Lerp(transform.position , targetCamPos , smoothing * Time.deltaTime);
    }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
